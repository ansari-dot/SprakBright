import { useEffect, useState } from "react";
import api, { resolveImageUrl } from "../services/api";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";

const Blogs = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    snippet: "",
    date: "",
    link: "",
    image: null,
  });

  // Reset form
  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      snippet: "",
      date: "",
      link: "",
      image: null,
    });
    setEditingId(null);
  };

  // Fetch all data
  const fetchAll = async () => {
    try {
      setLoading(true);

      const res = await api.get("/blogs/get");
      console.log(res.data)
      setItems(res.data?.data || res.data || []);
    } catch (err) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Image input
  const onImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files?.[0] || null }));
  };

  // Prepare FormData
  const buildFormData = () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("snippet", form.snippet);
    fd.append("date", form.date);
    fd.append("link", form.link);
    if (form.image) fd.append("image", form.image);
    return fd;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const fd = buildFormData();

      if (editingId) {
        await api.put(`/testimonial/update/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog updated");
      } else {
        await api.post("/blogs/add", fd, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Blog added");
      }

      resetForm();
      setShowFormModal(false);
      fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit item
  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      category: item.category || "",
      snippet: item.snippet || "",
      date: item.date || "",
      link: item.link || "",
      image: null,
    });
    setShowFormModal(true);
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await api.delete(`/testimonial/delete/${id}`);
      toast.success("Blog deleted");
      fetchAll();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Blogs Management</h5>

          <div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                resetForm();
                setShowFormModal(true);
              }}>
              + Add Blog
            </Button>
            <Button
              className="ms-2"
              variant="secondary"
              size="sm"
              onClick={fetchAll}
              disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Snippet</th>
                  <th>Link</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {resolveImageUrl(item.image) ? (
                        <img
                          src={resolveImageUrl(item.image)}
                          style={{
                            width: 70,
                            height: 55,
                            borderRadius: 6,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.date}</td>
                    <td>{item.snippet}</td>
                    <td>
                      <a href={item.link} target="_blank" rel="noreferrer">
                        View
                      </a>
                    </td>

                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => startEdit(item)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowDetailModal(true);
                        }}>
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(item._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-3">
                      No Blogs Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        size="lg"
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Blog" : "Add Blog"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={onChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Link</label>
                <input
                  name="link"
                  value={form.link}
                  onChange={onChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Snippet</label>
                <textarea
                  name="snippet"
                  value={form.snippet}
                  onChange={onChange}
                  className="form-control"
                  rows={2}></textarea>
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={onImageChange}
                />
              </div>
            </div>

            <div className="text-end">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => {
                  resetForm();
                  setShowFormModal(false);
                }}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Blog Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <h5>{selectedItem.title}</h5>
              <p>
                <strong>Category:</strong> {selectedItem.category}
              </p>
              <p>
                <strong>Date:</strong> {selectedItem.date}
              </p>
              <p>
                <strong>Snippet:</strong> {selectedItem.snippet}
              </p>
              <p>
                <strong>Link:</strong>{" "}
                <a href={selectedItem.link} target="_blank">
                  Open Link
                </a>
              </p>

              {resolveImageUrl(selectedItem.image) && (
                <img
                  src={resolveImageUrl(selectedItem.image)}
                  className="img-fluid rounded"
                  style={{ maxHeight: "250px" }}
                />
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Blogs;