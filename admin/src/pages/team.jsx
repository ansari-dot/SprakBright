import { useEffect, useState } from 'react'
import api, { resolveImageUrl } from '../services/api'
import { toast } from 'react-hot-toast'
import { Modal, Button } from 'react-bootstrap'

const Team = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const ASSET_BASE = (api.defaults?.baseURL || '').replace(/\/?api$/, '')

  const [form, setForm] = useState({
    name: '',
    role: '',
    type: 'digital',
    twitter: '',
    linkedin: '',
    facebook: '',
    image: null,
  })

  const resetForm = () => {
    setForm({ name: '', role: '', type: 'digital', twitter: '', linkedin: '', facebook: '', image: null })
    setEditingId(null)
  }

  const fetchMembers = async () => {
    try {
      setLoading(true)
      console.log('Fetching team members...')
      const res = await api.get('/team/get')
      console.log('Team API Response:', res.data)
      setMembers(res.data.members || [])
     console.log('member',members)
    } catch (error) {
      console.error('Error fetching team members:', error)
      console.error('Error response:', error.response?.data || error.message)
      toast.error('Failed to load team members. Please check console for details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      fetchMembers()
    }, 100)
    
    // Cleanup function
    return () => clearTimeout(timer)
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
    fd.append('type', form.type)
    fd.append('twitter', form.twitter)
    fd.append('linkedin', form.linkedin)
    fd.append('facebook', form.facebook)
    if (form.image) fd.append('image', form.image)
    return fd
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const fd = buildFormData()
      if (editingId) {
        await api.put(`/team/update/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        toast.success('Member updated')
      } else {
        await api.post('/team/add', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        toast.success('Member added')
      }
      resetForm()
      fetchMembers()
      setShowFormModal(false)
    } catch (e) {
      const msg = e?.response?.data?.message || 'Submission failed'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const startEdit = (m) => {
    setEditingId(m._id)
    setForm({
      name: m.name || '',
      role: m.role || '',
      type: m.type || 'digital',
      twitter: m.socialLinks?.twitter || '',
      linkedin: m.socialLinks?.linkedin || '',
      facebook: m.socialLinks?.facebook || '',
      image: null,
    })
    setShowFormModal(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/team/delete/${id}`)
      toast.success('Member deleted')
      fetchMembers()
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
              <h5 className="mb-0">Team</h5>
              <div className="d-flex">
                <Button variant="light" size="sm" onClick={() => { resetForm(); setShowFormModal(true) }}>Add Member</Button>
                <Button className="ms-2" variant="light" size="sm" onClick={fetchMembers} disabled={loading}>
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
                      <th>Type</th>
                      <th>Image</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((m) => (
                      <tr key={m._id}>
                        <td data-label="Name">{m.name}</td>
                        <td data-label="Role">{m.role}</td>
                        <td data-label="Type">{m.type}</td>
                        <td data-label="Image">
                          {m.image ? (
                            <img src={resolveImageUrl(m.image)} alt={m.name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} loading="lazy" decoding="async" />
                          ) : (
                            <span className="text-muted">No image</span>
                          )}
                        </td>
                        <td data-label="Actions" className="text-end">
                          <div className="d-inline-flex">
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => startEdit(m)}>Edit</Button>
                            <Button variant="light" className="btn btn-sm me-2" onClick={() => { setSelectedMember(m); setShowDetailModal(true) }}>View</Button>
                            <Button variant="light" className="btn btn-sm" onClick={() => handleDelete(m._id)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {members.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center text-muted">No team members found</td>
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
          <Modal.Title>{editingId ? 'Edit Member' : 'Add Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input type="text" className="form-control" name="role" value={form.role} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <select className="form-select" name="type" value={form.type} onChange={onChange} required>
                <option value="digital">digital</option>
                <option value="physical">physical</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Twitter</label>
              <input type="text" className="form-control" name="twitter" value={form.twitter} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">LinkedIn</label>
              <input type="text" className="form-control" name="linkedin" value={form.linkedin} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Facebook</label>
              <input type="text" className="form-control" name="facebook" value={form.facebook} onChange={onChange} />
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
          <Modal.Title>Member Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMember && (
            <div>
              <h5 className="mb-2">{selectedMember.name}</h5>
              <p><strong>Role:</strong> {selectedMember.role}</p>
              <p><strong>Type:</strong> {selectedMember.type}</p>
              {selectedMember.image && (
                <div>
                  <strong>Image:</strong>
                  <img src={resolveImageUrl(selectedMember.image)} alt={selectedMember.name} className="img-fluid mt-2" style={{ maxHeight: '200px' }} loading="lazy" decoding="async" />
                </div>
              )}
              {selectedMember.socialLinks && (
                <div className="mt-2">
                  <div><strong>Twitter:</strong> {selectedMember.socialLinks.twitter || '-'}</div>
                  <div><strong>LinkedIn:</strong> {selectedMember.socialLinks.linkedin || '-'}</div>
                  <div><strong>Facebook:</strong> {selectedMember.socialLinks.facebook || '-'}</div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Team