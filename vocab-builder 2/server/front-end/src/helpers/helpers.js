import axios from 'axios';

const HOST = 'http://localhost:3000';
// const HOST = 'http://localhost:8080' //  error — 404 or connection error
const WORDS_PATH = '/words';

// Dispatch a flash event that App.vue listens to
export function flash(message, type = 'success', timeout) {
  window.dispatchEvent(new CustomEvent('flash', { detail: { message, type, timeout } }));
}

// Improved error handler: log, flash an error message and rethrow so callers can handle errors
const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    console.error(error);
    try {
      const status = error.response && error.response.status ? error.response.status : 'Error';
      const statusText = error.response && error.response.statusText ? error.response.statusText : (error.message || 'Request failed');
      flash(`${status}: ${statusText}`, 'error');
    } catch (err) {
      // ignore
    }
    throw error;
  });

export const api = {
  // axios-like helpers
  get: handleError(async path => axios.get(HOST + path)),
  post: handleError(async (path, payload) => axios.post(HOST + path, payload)),
  put: handleError(async (path, payload) => axios.put(HOST + path, payload)),
  delete: handleError(async path => axios.delete(HOST + path)),

  // Convenience methods for the words API (return data directly)
  getWords: handleError(async () => {
    const res = await axios.get(HOST + WORDS_PATH);
    return res.data;
  }),
  getWord: handleError(async id => {
    const res = await axios.get(`${HOST}${WORDS_PATH}/${id}`);
    return res.data;
  }),
  createWord: handleError(async newWord => {
    const res = await axios.post(HOST + WORDS_PATH, newWord);
    return res.data;
  }),
  updateWord: handleError(async newWord => {
    const res = await axios.put(`${HOST}${WORDS_PATH}/${newWord._id}`, newWord);
    return res.data;
  }),
  deleteWord: handleError(async id => {
    const res = await axios.delete(`${HOST}${WORDS_PATH}/${id}`);
    return res.data;
  })
};
