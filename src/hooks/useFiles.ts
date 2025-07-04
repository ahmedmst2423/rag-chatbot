import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useFileService from '../services/fileService'
import { useNotification } from '../context/notificationContext'


export const useFiles = () => {
  const queryClient = useQueryClient()
  const { getFiles, deleteFile, uploadFile } = useFileService();
  const { showSuccess, showError } = useNotification();
  const { data: files = [], isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: getFiles,
  });

  

  const handleUpload = async (files: any[]) => {
    if (!files || files.length === 0) {
      throw new Error('No files to upload');
    }
    
    const formData:FormData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    await uploadFile(formData);

  }

  const upload = useMutation({
    mutationFn:handleUpload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });

    },
    onError: (error) => {
      showError('File upload failed ');
      
    }
  })

  const remove = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
      showSuccess('File deleted successfully');
    }
    
  })

  return { 
    files, 
    isLoading, 
    upload,
    isUploadLoading: upload.isPending, 
    remove,
    isRemoveFileLoading: remove.isPending
   }
}
