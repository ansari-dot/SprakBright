import { useEffect, useState } from "react";
import api, { resolveImageUrl } from "../services/api";
import "./Services.css";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // CLEAN FORM STATE
  const [form, setForm] = useState({
    title: "",
    description: "",
    highlight: "",
    jobs: "",
    imagePosition: "left",
    image: null,
  });

  // RESET FORM
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      highlight: "",
      jobs: "",
      imagePosition: "left",
      image: null,
    });
    setEditingId(null);
  };

  // FETCH DATA
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/service/get");
      const list = Array.isArray(res.data) ? res.data : res.data.services || [];
      setServices(list);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // FORM INPUT HANDLER
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE INPUT
  const onImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
  };

  // BUILD FORMDATA
  const buildFormData = () => {
    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("highlight", form.highlight);
    fd.append("imagePosition", form.imagePosition);

    // CLEAN JOB STRING -> ARRAY
    const jobsArray = form.jobs
      .split(",")
      .map((j) => j.trim())
      .filter((j) => j.length);

    fd.append("jobs", JSON.stringify(jobsArray));

    if (form.image) fd.append("image", form.image);

    return fd;
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const fd = buildFormData();

      if (editingId) {
        await api.put(`/service/update/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service updated");
      } else {
        await api.post(`/service/add`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service created");
      }

      resetForm();
      fetchServices();
      setShowFormModal(false);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // START EDIT MODE
  const startEdit = (s) => {
    setEditingId(s._id);
    setForm({
      title: s.title || "",
      description: s.description || "",
      highlight: s.highlight || "",
      jobs: Array.isArray(s.jobs) ? s.jobs.join(", ") : "",
      imagePosition: s.imagePosition || "left",
      image: null,
    });
    setShowFormModal(true);
  };

  // DELETE SERVICE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/service/${id}`);
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Delete failed");
    }
  };

  // FEATURE TOGGLE
  const toggleFeatured = async (id) => {
    try {
      const res = await api.put(`/service/toggle-featured/${id}`);
      toast.success(res?.data?.message || "Updated");
      fetchServices();
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="container-fluid">
      {/* TOP HEADER */}
      <div className="card shadow-sm mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Services</h5>

          <div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                resetForm();
                setShowFormModal(true);
              }}>
              Add Service
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="ms-2"
              onClick={fetchServices}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>
      </div>

      {/* SERVICES TABLE */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Position</th>
                  <th>Highlight</th>
                  <th>Featured</th>
                  <th>Created</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((s) => (
                  <tr key={s._id}>
                    <td>{s.title}</td>

                    <td>
                      {s.image ? (
                        <img
                          src={resolveImageUrl(s.image)}
                          alt={s.title}
                          style={{
                            width: 60,
                            height: 40,
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>

                    <td>{s.imagePosition}</td>
                    <td>{s.highlight}</td>

                    <td>
                      <span
                        className={`badge ${
                          s.featured ? "bg-success" : "bg-secondary"
                        }`}>
                        {s.featured ? "Yes" : "No"}
                      </span>
                    </td>

                    <td>{new Date(s.createdAt).toLocaleDateString()}</td>

                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => startEdit(s)}>
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => {
                          setSelectedService(s);
                          setShowDetailModal(true);
                        }}>
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        className="me-2"
                        onClick={() => handleDelete(s._id)}>
                        Delete
                      </Button>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFeatured(s._id)}>
                        {s.featured ? "Unfeature" : "Feature"}
                      </Button>
                    </td>
                  </tr>
                ))}

                {services.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-muted">
                      No services found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        size="lg"
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Service" : "Add Service"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                name="title"
                value={form.title}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                name="description"
                value={form.description}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Highlight</label>
              <textarea
                className="form-control"
                rows={3}
                name="highlight"
                value={form.highlight}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image Position</label>
              <select
                className="form-select"
                name="imagePosition"
                value={form.imagePosition}
                onChange={onChange}>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Jobs (comma separated)</label>
              <input
                className="form-control"
                name="jobs"
                value={form.jobs}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={onImageChange}
              />
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

      {/* SERVICE DETAILS MODAL */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Service Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedService && (
            <div>
              <h5>{selectedService.title}</h5>

              <p>
                <strong>Description:</strong> {selectedService.description}
              </p>

              <p>
                <strong>Highlight:</strong> {selectedService.highlight}
              </p>

              {Array.isArray(selectedService.jobs) &&
                selectedService.jobs.length > 0 && (
                  <p>
                    <strong>Jobs:</strong> {selectedService.jobs.join(", ")}
                  </p>
                )}

              {selectedService.image && (
                <img
                  src={resolveImageUrl(selectedService.image)}
                  alt={selectedService.title}
                  className="img-fluid rounded mt-3"
                  style={{ maxHeight: 220 }}
                />
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Services;
