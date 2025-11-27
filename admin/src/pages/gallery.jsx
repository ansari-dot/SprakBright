import { useEffect, useState } from "react";
import api, { resolveImageUrl } from "../services/api";
import { toast } from "react-hot-toast";
import { Modal, Button, Form } from "react-bootstrap";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [form, setForm] = useState({
    clean: null,
    dirty: [],
  });

  const resetForm = () => {
    setForm({
      clean: null,
      dirty: [],
    });
    setEditingId(null);
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery/get");
      setItems(res.data || []);
    } catch (err) {
      toast.error("Failed to load gallery items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onCleanImageChange = (e) => {
    setForm((prev) => ({ ...prev, clean: e.target.files?.[0] || null }));
  };

  const onDirtyImagesChange = (e) => {
    setForm((prev) => ({ ...prev, dirty: Array.from(e.target.files) || [] }));
  };

  const buildFormData = () => {
    const fd = new FormData();
    if (form.clean) fd.append("clean", form.clean);
    form.dirty.forEach((file) => {
      fd.append("dirty", file);
    });
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const fd = buildFormData();

      if (editingId) {
        await api.put(`/gallery/update/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery item updated");
      } else {
        await api.post("/gallery/add", fd, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Gallery item added");
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

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      clean: null, // Images are not pre-filled for security/complexity
      dirty: [],
    });
    setSelectedItem(item); // Store item to display current images in modal if needed
    setShowFormModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      await api.delete(`/gallery/delete/${id}`);
      toast.success("Gallery item deleted");
      fetchAll();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container-fluid py-3">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Gallery Management</h5>

          <div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                resetForm();
                setShowFormModal(true);
              }}
            >
              + Add Gallery Item
            </Button>
            <Button
              className="ms-2"
              variant="secondary"
              size="sm"
              onClick={fetchAll}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Clean Image</th>
                  <th>Dirty Images</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {resolveImageUrl(item.clean) ? (
                        <img
                          src={resolveImageUrl(item.clean)}
                          style={{
                            width: 70,
                            height: 55,
                            borderRadius: 6,
                            objectFit: "cover",
                          }}
                          alt="Clean"
                        />
                      ) : (
                        <span className="text-muted">No Clean Image</span>
                      )}
                    </td>
                    <td>
                      {item.dirty && item.dirty.length > 0 ? (
                        <div className="d-flex flex-wrap">
                          {item.dirty.map((img, index) => (
                            <img
                              key={index}
                              src={resolveImageUrl(img)}
                              style={{
                                width: 50,
                                height: 40,
                                borderRadius: 4,
                                objectFit: "cover",
                                marginRight: 5,
                                marginBottom: 5,
                              }}
                              alt="Dirty"
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">No Dirty Images</span>
                      )}
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => startEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-muted">
                      No gallery items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal show={showFormModal} onHide={() => setShowFormModal(false)} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Gallery Item" : "Add Gallery Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Form.Label>Clean Image (Max 1)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={onCleanImageChange}
                required={!editingId && !form.clean} // Required only for new items if no clean image is selected
              />
              {editingId && selectedItem?.clean && (
                <div className="mt-2">
                  Current Clean Image:{" "}
                  <img
                    src={resolveImageUrl(selectedItem.clean)}
                    style={{ width: 100, height: 75, objectFit: "cover", borderRadius: 4 }}
                    alt="Current Clean"
                  />
                </div>
              )}
            </div>

            <div className="mb-3">
              <Form.Label>Dirty Images (Max 20, multiple select)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={onDirtyImagesChange}
                required={!editingId && form.dirty.length === 0} // Required only for new items if no dirty images are selected
              />
              {editingId && selectedItem?.dirty && selectedItem.dirty.length > 0 && (
                <div className="mt-2">
                  Current Dirty Images:{" "}
                  <div className="d-flex flex-wrap">
                    {selectedItem.dirty.map((img, index) => (
                      <img
                        key={index}
                        src={resolveImageUrl(img)}
                        style={{
                          width: 70,
                          height: 55,
                          objectFit: "cover",
                          borderRadius: 4,
                          marginRight: 5,
                          marginBottom: 5,
                        }}
                        alt="Current Dirty"
                      />
                    ))}
                  </div>
                </div>
              )}
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
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Gallery;