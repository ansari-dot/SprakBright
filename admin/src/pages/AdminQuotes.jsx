import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button, Modal } from 'react-bootstrap';
import api from '../services/api';

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/quotes');
      setQuotes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch quotes. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewQuote = (quote) => {
    setSelectedQuote(quote);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedQuote(null);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDeleteQuote = async (quoteId) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;

    setDeleteStatus(prev => ({ ...prev, [quoteId]: 'deleting' }));
    try {
      await api.delete(`/quotes/${quoteId}`);
      setQuotes(quotes.filter(quote => quote._id !== quoteId));
      setDeleteStatus(prev => ({ ...prev, [quoteId]: 'deleted' }));
      setTimeout(() => setDeleteStatus(prev => ({ ...prev, [quoteId]: undefined })), 2000);
    } catch (err) {
      setError('Failed to delete quote. Please try again later.');
      setDeleteStatus(prev => ({ ...prev, [quoteId]: 'failed' }));
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 font-medium">{error}</div>;
  }

  return (
    <Container fluid className="py-4">
      <h1 className="h3 mb-4">Submitted Quotes</h1>
      <Card className="shadow-sm mb-4">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Submitted Quotes</h5>
          <Button variant="secondary" size="sm" onClick={fetchQuotes} disabled={isLoading} className="ms-2">
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
        <Card.Body>
            <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rooms/Area</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cleaning Frequency</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Date</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr key={quote._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.propertyType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.numRooms || quote.roomsArea}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.cleaningFrequency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(quote.preferredDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteQuote(quote._id)}
                        disabled={deleteStatus[quote._id] === 'deleting'}
                        className="me-2"
                      >
                        {deleteStatus[quote._id] === 'deleting' ? 'Deleting...' : 'Delete'}
                      </Button>
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() => handleViewQuote(quote)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {quotes.length === 0 && !isLoading && (
            <div className="text-center text-muted py-3">
              No quotes have been submitted yet.
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showViewModal} onHide={handleCloseViewModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Quote Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQuote && (
            <div className="p-4">
              <p><strong>Name:</strong> {selectedQuote.name}</p>
              <p><strong>Email:</strong> {selectedQuote.email}</p>
              <p><strong>Phone:</strong> {selectedQuote.phone}</p>
              <p><strong>Address:</strong> {selectedQuote.address}</p>
              <p><strong>Property Type:</strong> {selectedQuote.propertyType}</p>
              <p><strong>Rooms/Area:</strong> {selectedQuote.numRooms || selectedQuote.roomsArea}</p>
              <p><strong>Cleaning Frequency:</strong> {selectedQuote.cleaningFrequency}</p>
              <p><strong>Preferred Date:</strong> {new Date(selectedQuote.preferredDate).toLocaleDateString()}</p>
              <p><strong>Message:</strong> {selectedQuote.message}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminQuotes;