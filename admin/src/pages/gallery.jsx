import { useEffect, useState } from 'react'
import api, { resolveImageUrl } from '../services/api'
import { toast } from 'react-hot-toast'
import { Modal, Button } from 'react-bootstrap'

const Gallery = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const ASSET_BASE = (api.defaults?.baseURL || '').replace(/\/?api$/, '')

  const [form, setForm] = useState({ images: [] })

  const resetForm = () => { setForm({ images: [] }); setEditingId(null) }

  const fetchAll = async () => {
    try { setLoading(true); const res = await api.get('/gallery/get'); setItems(Array.isArray(res.data) ? res.data : res.data?.data || []); }
    catch { toast.error('Failed to load galleries') } finally { setLoading(false) }
  }

  useEffect(() => { fetchAll() }, [])

  const onImagesChange = (e) => setForm((p) => ({ ...p, images: Array.from(e.target.files || []) }))

  const buildFormData = () => { const fd = new FormData();  form.images.forEach((f) => fd.append('images', f)); return fd }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const fd = buildFormData()
      if (editingId) { await api.put(`/gallery/update/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Gallery updated') }
      else { await api.post('/gallery/add', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Gallery created') }
      resetForm(); fetchAll(); setShowFormModal(false)
    } catch (e) { toast.error(e?.response?.data?.message || 'Submission failed') } finally { setSubmitting(false) }
  }

  const startEdit = (g) => { setEditingId(g._id); setForm({ title: g.title || '', images: [] }); setShowFormModal(true) }
  const handleDelete = async (id) => { try { await api.delete(`/gallery/delete/${id}`); toast.success('Gallery deleted'); fetchAll() } catch { toast.error('Delete failed') } }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Galleries</h5>
              <div className="d-flex">
                <Button variant="light" size="sm" onClick={() => { resetForm(); setShowFormModal(true) }}>Add Gallery</Button>
                <Button className="ms-2" variant="light" size="sm" onClick={fetchAll} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</Button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Images</th>
                      <th>Created</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((g) => (
                      <tr key={g._id}>
                        <td data-label="Images">{Array.isArray(g.images) ? g.images.length : 0}</td>
                        <td data-label="Created">{new Date(g.createdAt).toLocaleDateString()}</td>
                        <td data-label="Actions" className="text-end">
                          <div className="d-inline-flex">
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => startEdit(g)}>Edit</Button>
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => { setSelectedItem(g); setShowDetailModal(true) }}>View</Button>
                            <Button variant="light" className="btn btn-sm" onClick={() => handleDelete(g._id)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center text-muted">No galleries found</td>
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
          <Modal.Title>{editingId ? 'Edit Gallery' : 'Add Gallery'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
              <label className="form-label">Images</label>
              <input type="file" className="form-control" accept="image/*" multiple onChange={onImagesChange} />
            </div>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="light" disabled={submitting}>{submitting ? 'Saving...' : editingId ? 'Update' : 'Create'}</Button>
              <Button className="ms-2" variant="light" onClick={() => { resetForm(); setShowFormModal(false) }}>Cancel</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Gallery Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <h5 className="mb-2">{selectedItem.title}</h5>
              {Array.isArray(selectedItem.images) && selectedItem.images.length > 0 ? (
                <div className="d-flex flex-wrap">
                  {selectedItem.images.map((img, idx) => (
                    <img key={idx} src={resolveImageUrl(img)} alt={`image-${idx}`} className="img-thumbnail me-2 mb-2" style={{ width: '120px', height: '120px', objectFit: 'cover' }} loading="lazy" decoding="async" />
                  ))}
                </div>
              ) : (
                <div className="text-muted">No images</div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Gallery