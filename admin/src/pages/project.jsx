import { useEffect, useState } from 'react'
import api, { resolveImageUrl } from '../services/api'
import { toast } from 'react-hot-toast'
import { Modal, Button } from 'react-bootstrap'

const Project = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const ASSET_BASE = (api.defaults?.baseURL || '').replace(/\/?api$/, '')

  const [form, setForm] = useState({
    title: '',
    category: 'other',
    description: '',
    client: '',
    location: '',
    duration: '',
    size: '',
    services: '',
    image: null,
    images: [],
  })

  const resetForm = () => {
    setForm({
      title: '', category: 'other', description: '', client: '', location: '',
      duration: '', size: '', services: '', image: null, images: []
    })
    setEditingId(null)
  }

  const fetchAll = async () => {
    try {
      setLoading(true)
      const res = await api.get('/project/get')
      const list = Array.isArray(res.data) ? res.data : res.data?.data || []
      setItems(list)
    } catch (e) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const onImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    console.log('Selected cover image:', file ? {
      name: file.name,
      type: file.type,
      size: file.size,
      isFile: file instanceof File
    } : 'No file selected');
    setForm(p => ({ ...p, image: file }));
  }

  const onGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    console.log('Selected gallery images:', files.map(f => ({
      name: f.name,
      type: f.type,
      size: f.size,
      isFile: f instanceof File
    })));
    setForm(p => ({ ...p, images: files }));
  }

  const buildFormData = (includeGallery = false) => {
    const fd = new FormData()
    
    // Add text fields
    fd.append('title', form.title)
    fd.append('category', form.category)
    fd.append('description', form.description)
    
    // Add details as JSON string
    const details = {
      client: form.client || '',
      location: form.location || '',
      duration: form.duration || '',
      size: form.size || '',
    }
    fd.append('details', JSON.stringify(details))
    
    // Process services
    const servicesArr = form.services 
      ? form.services.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
      : [];
    if (servicesArr.length > 0) {
      fd.append('services', JSON.stringify(servicesArr))
    }
    
    // Add main image (required)
    if (!form.image) {
      throw new Error('Project image is required')
    }
    
    console.log('Appending main image to form data:', {
      name: form.image.name,
      type: form.image.type,
      size: form.image.size,
      isFile: form.image instanceof File
    })
    
    // Append the main image with the exact field name 'image'
    fd.append('image', form.image)
    
    // Add gallery images if needed
    if (includeGallery && form.images?.length > 0) {
      console.log(`Appending ${form.images.length} gallery images`)
      form.images.forEach((file, index) => {
        console.log(`Gallery image ${index + 1}:`, {
          name: file.name,
          type: file.type,
          size: file.size,
          isFile: file instanceof File
        })
        // Append each gallery image with the field name 'images'
        fd.append('images', file)
      })
    }
    
    // Log the form data for debugging
    console.log('Form Data Contents:')
    for (let pair of fd.entries()) {
      console.log(pair[0], ':', pair[1] instanceof File ? 
        `[File] ${pair[1].name} (${(pair[1].size / 1024).toFixed(2)} KB)` : 
        pair[1])
    }
    
    // Log form data for debugging
    for (let pair of fd.entries()) {
      console.log(pair[0] + ': ', pair[1])
    }
    
    return fd
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      
      // Validate required fields
      if (!form.title || !form.description) {
        toast.error('Title and description are required')
        return
      }
      
      if (!form.image) {
        toast.error('Please select a project image')
        return
      }
      
      const fd = buildFormData(true)
      
      // Log the form data being sent
      console.log('Submitting form with data:', {
        title: form.title,
        hasImage: !!form.image,
        imageName: form.image?.name,
        imageType: form.image?.type,
        imageSize: form.image?.size
      })
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(`Upload Progress: ${progress}%`)
        },
      }
      
      if (editingId) {
        await api.put(`/project/update/${editingId}`, fd, config)
        toast.success('Project updated successfully')
      } else {
        await api.post('/project/add', fd, config)
        toast.success('Project created successfully')
      }
      resetForm()
      fetchAll()
      setShowFormModal(false)
    } catch (e) {
      const msg = e?.response?.data?.message || 'Submission failed'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const startEdit = (p) => {
    setEditingId(p._id)
    setForm({
      title: p.title || '',
      category: p.category || 'other',
      description: p.description || '',
      client: p.details?.client || '',
      location: p.details?.location || '',
      duration: p.details?.duration || '',
      size: p.details?.size || '',
      services: Array.isArray(p.details?.services) ? p.details.services.join(', ') : '',
      image: null,
      images: [],
    })
    setShowFormModal(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/project/delete/${id}`)
      toast.success('Project deleted')
      fetchAll()
    } catch (e) {
      toast.error('Delete failed')
    }
  }

  const toggleFeatured = async (id) => {
    try {
      const res = await api.put(`/project/toggle-featured/${id}`)
      const msg = res?.data?.message || 'Featured toggled'
      toast.success(msg)
      fetchAll()
    } catch (e) {
      toast.error('Toggle failed')
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Projects</h5>
              <div className="d-flex">
                <Button variant="primary" size="sm" onClick={() => { resetForm(); setShowFormModal(true) }}>Add Project</Button>
                <Button className="ms-2" variant="outline-secondary" size="sm" onClick={fetchAll} disabled={loading}>
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Image</th>
                      <th>Featured</th>
                      <th>Created</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p) => (
                      <tr key={p._id}>
                        <td data-label="Title">{p.title}</td>
                        <td data-label="Category">{p.category}</td>
                        <td data-label="Image">
                          {p.image ? (
                            <img src={resolveImageUrl(p.image)} alt={p.title} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} loading="lazy" decoding="async" />
                          ) : (
                            <span className="text-muted">No image</span>
                          )}
                        </td>
                        <td data-label="Featured">
                          <span className={`badge ${p.featured ? 'bg-success' : 'bg-secondary'} status-badge`}>
                            {p.featured ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td data-label="Created">{new Date(p.createdAt).toLocaleDateString()}</td>
                        <td data-label="Actions" className="text-end">
                          <div className="d-inline-flex">
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => startEdit(p)}>Edit</Button>
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => { setSelectedProject(p); setShowDetailModal(true) }}>View</Button>
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => handleDelete(p._id)}>Delete</Button>
                            <Button variant="light" className="btn btn-sm" onClick={() => toggleFeatured(p._id)}>
                              {p.featured ? 'Unfeature' : 'Feature'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center text-muted">No projects found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showFormModal} onHide={() => setShowFormModal(false)} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Project' : 'Add Project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="title" value={form.title} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select className="form-select" name="category" value={form.category} onChange={onChange}>
                <option value="residential">residential</option>
                <option value="commercial">commercial</option>
                <option value="industrial">industrial</option>
                <option value="construction">construction</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3} name="description" value={form.description} onChange={onChange} required />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Client</label>
                <input type="text" className="form-control" name="client" value={form.client} onChange={onChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Location</label>
                <input type="text" className="form-control" name="location" value={form.location} onChange={onChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Duration</label>
                <input type="text" className="form-control" name="duration" value={form.duration} onChange={onChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Size</label>
                <input type="text" className="form-control" name="size" value={form.size} onChange={onChange} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Services (comma separated)</label>
              <input type="text" className="form-control" name="services" value={form.services} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Cover Image (required)</label>
              <input 
                type="file" 
                className="form-control" 
                accept="image/*" 
                name="image"
                onChange={onImageChange}
                id="projectImage"
                key={form.image ? 'file-selected' : 'no-file'}
              />
              {form.image && (
                <div className="mt-2 text-muted small">
                  Selected: {form.image.name} ({(form.image.size / 1024).toFixed(2)} KB)
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Gallery Images</label>
              <input 
                type="file" 
                className="form-control" 
                accept="image/*" 
                multiple 
                name="images"
                onChange={onGalleryChange} 
              />
              {form.images?.length > 0 && (
                <div className="mt-2 text-muted small">
                  Selected {form.images.length} file(s)
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="light" disabled={submitting}>
                {submitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </Button>
              <Button className="ms-2" variant="light" onClick={() => { resetForm(); setShowFormModal(false) }}>Cancel</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <div>
              <h5 className="mb-3">{selectedProject.title}</h5>
              <p><strong>Category:</strong> {selectedProject.category}</p>
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>Client:</strong> {selectedProject.details?.client}</p>
              <p><strong>Location:</strong> {selectedProject.details?.location}</p>
              <p><strong>Duration:</strong> {selectedProject.details?.duration}</p>
              <p><strong>Size:</strong> {selectedProject.details?.size}</p>
              <p><strong>Services:</strong> {Array.isArray(selectedProject.details?.services) ? selectedProject.details.services.join(', ') : '-'}</p>
              {selectedProject.image && (
                <div>
                  <strong>Cover Image:</strong>
                  <img src={resolveImageUrl(selectedProject.image)} alt={selectedProject.title} className="img-fluid mt-2" style={{ maxHeight: '200px' }} loading="lazy" decoding="async" />
                </div>
              )}
              {Array.isArray(selectedProject.details?.gallery) && selectedProject.details.gallery.length > 0 && (
                <div className="mt-3">
                  <strong>Gallery Images:</strong>
                  <div className="d-flex flex-wrap mt-2">
                    {selectedProject.details.gallery.map((img, index) => (
                      <img key={index} src={resolveImageUrl(img)} alt={`${selectedProject.title} gallery ${index + 1}`} className="img-thumbnail me-2 mb-2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} loading="lazy" decoding="async" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Project