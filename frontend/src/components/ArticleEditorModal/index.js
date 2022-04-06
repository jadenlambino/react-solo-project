import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ArticleEditor from './ArticleEditorForm';

function ArticleEditorModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ArticleEditor />
        </Modal>
      )}
    </>
  );
}

export default ArticleEditorModal;
