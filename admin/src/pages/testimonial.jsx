import { useEffect, useState } from 'react'
import api, { resolveImageUrl } from '../services/api'
import { toast } from 'react-hot-toast'
import { Modal, Button } from 'react-bootstrap'

const Testimonial = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const ASSET_BASE = (api.defaults?.baseURL || '').replace(/\/?api$/, '')

  const [form, setForm] = useState({
    name: '',
    role: '',
    message: '',
    image: null,
  })

  const resetForm = () => {
    setForm({ name: '', role: '', message: '', image: null })
    setEditingId(null)
  }

  const fetchAll = async () => {
    try {
      setLoading(true)
      const res = await api.get('/testimonial/get')
      const list = Array.isArray(res.data) ? res.data : res.data?.data || []
      setItems(list)
    } catch (e) {
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const onImageChange = (e) => {
    const file = e.target.files?.[0] || null
    setForm((p) => ({ ...p, image: file }))
  }

  const buildFormData = () => {
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('role', form.role)
    fd.append('message', form.message)
    if (form.image) fd.append('image', form.image)
    return fd
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const fd = buildFormData()
      if (editingId) {
        await api.put(`/testimonial/update/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        toast.success('Testimonial updated')
      } else {
        await api.post('/testimonial/add', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        toast.success('Testimonial added')
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

  const startEdit = (t) => {
    setEditingId(t._id)
    setForm({ name: t.name || '', role: t.role || '', message: t.message || '', image: null })
    setShowFormModal(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/testimonial/delete/${id}`)
      toast.success('Testimonial deleted')
      fetchAll()
    } catch (e) {
      toast.error('Delete failed')
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Testimonials</h5>
              <div className="d-flex">
                <Button variant="light" size="sm" onClick={() => { resetForm(); setShowFormModal(true) }}>Add Testimonial</Button>
                <Button className="ms-2" variant="light" size="sm" onClick={fetchAll} disabled={loading}>
                  {loading ? 'Loading...' : 'Refresh'}
                </Button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Image</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((t) => (
                      <tr key={t._id}>
                        <td data-label="Name">{t.name}</td>
                        <td data-label="Role">{t.role || '-'}</td>
                        <td data-label="Image">
                          {resolveImageUrl(t.image || t.photo || t.avatar || t.picture) ? (
                            <img src={resolveImageUrl(t.image || t.photo || t.avatar || t.picture)} alt={t.name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} loading="lazy" decoding="async" />
                          ) : (
                            <span className="text-muted">No image</span>
                          )}
                        </td>
                        <td data-label="Actions" className="text-end">
                          <div className="d-inline-flex">
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => startEdit(t)}>Edit</Button>
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => { setSelectedItem(t); setShowDetailModal(true) }}>View</Button>
                            <Button variant="light" className="btn btn-sm" onClick={() => handleDelete(t._id)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center text-muted">No testimonials found</td>
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
          <Modal.Title>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input type="text" className="form-control" name="role" value={form.role} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows={3} name="message" value={form.message} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={onImageChange} />
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

      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Testimonial Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <h5 className="mb-2">{selectedItem.name}</h5>
              <p><strong>Role:</strong> {selectedItem.role || '-'}</p>
              <p><strong>Message:</strong> {selectedItem.message}</p>
              {resolveImageUrl(selectedItem.image || selectedItem.photo || selectedItem.avatar || selectedItem.picture) && (
                <div>
                  <strong>Image:</strong>
                  <img src={resolveImageUrl(selectedItem.image || selectedItem.photo || selectedItem.avatar || selectedItem.picture)} alt={selectedItem.name} className="img-fluid mt-2" style={{ maxHeight: '200px' }} loading="lazy" decoding="async" />
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Testimonial