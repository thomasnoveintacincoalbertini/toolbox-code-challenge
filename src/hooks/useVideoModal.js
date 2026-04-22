import { useState, useCallback } from 'react';

const useVideoModal = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = useCallback((item) => {
    setSelectedItem(item);
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  return { selectedItem, modalVisible, handleItemPress, handleModalClose };
};

export default useVideoModal;
