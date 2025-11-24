import { useEffect, useState } from 'react'
import api from '../services/api'
import { toast } from 'react-hot-toast'
import { Modal, Button } from 'react-bootstrap'

const Message = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const fetchAll = async () => {
    try {
      setLoading(true)
      const res = await api.get('/contact/get',{
        withCredentials:true
      })
      const list = Array.isArray(res.data) ? res.data : res.data?.data || []
      setItems(list)
    } catch (e) {
      toast.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const setRead = async (id, read) => {
    try {
      await api.patch(`/contact/read-status/${id}`, { read })
      toast.success(read ? 'Marked as read' : 'Marked as unread')
      fetchAll()
    } catch (e) {
      toast.error('Update failed')
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contact/delete/${id}`)
      toast.success('Message deleted')
      fetchAll()
    } catch (e) {
      toast.error('Delete failed')
    }
  }

  return (
    <div className="container-fluid">
      <div className="card shadow-sm">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Messages</h5>
          <button className="btn btn-outline-secondary btn-sm" onClick={fetchAll} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((m) => (
                  <tr key={m._id}>
                    <td data-label="Name">{m.name}</td>
                    <td data-label="Email">{m.email}</td>
                    <td data-label="Subject">{m.service}</td>
                    
                    <td data-label="Date">{new Date(m.createdAt).toLocaleString()}</td>
                    <td data-label="Actions" className="text-end">
                      <div className="d-inline-flex">
                        <Button className="btn btn-sm btn-outline-info me-2" onClick={() => { setSelectedMessage(m); setShowDetailModal(true) }}>View</Button>
                        
                        <Button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m._id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">No messages found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <div>
              <div><strong>Name:</strong> {selectedMessage.firstName} {selectedMessage.lastName}</div>
              <div><strong>Email:</strong> {selectedMessage.email}</div>
              <div><strong>Phone:</strong> {selectedMessage.phone || '-'}</div>
              <div><strong>Subject:</strong> {selectedMessage.subject}</div>
              <div className="mt-2"><strong>Message:</strong><br />{selectedMessage.message}</div>
              <div className="mt-2 text-muted"><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Message