import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";

export const useApiMutation = ({
  url,
  method = "POST",
  secure = false,
  invalidateKeys = [],
  successMessage = "Success!",
  errorMessage = "Something went wrong",
  onSuccess, // ✅ Accept external callback
  onError, // ✅ Accept external callback
}) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const axiosClient = secure ? axiosSecure : axiosPublic;
  const queryClient = useQueryClient();
  // const token = localStorage.getItem("token");

  // console.log(axiosClient)

  return useMutation({
    mutationFn: async (data) => {
      const config = {
        method: method.toUpperCase(),
        url: url,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        // ✅ Fix: Axios DELETE expects data inside a 'data' key, others use 'data' directly
        ...(method.toUpperCase() === "DELETE"
          ? { data: data }
          : { data: data }),
      };

      // We use the generic request method to handle all types correctly
      const response = await axiosClient(config);
      return response.data;
    },

    onMutate: () => {
      const toastId = showLoadingToast("Processing...");
      return { toastId };
    },

    onSuccess: (response, variables, context) => {
      // 1. Update Toast
      updateToastSuccess(context.toastId, response?.message || successMessage);

      // 2. Invalidate Queries (Refresh Data)
      if (invalidateKeys.length > 0) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }

      // 3. ✅ Run the extra logic from your component (Navigation, Modal Close, etc.)
      if (onSuccess) {
        onSuccess(response, context.toastId);
      }
    },

    onError: (error, variables, context) => {
      // 4. ✅ Run external error logic if needed. 
      // If it returns true, we skip the default error toast update.
      if (onError) {
        const handled = onError(error, context.toastId);
        if (handled) return;
      }

      const message = error?.response?.data?.message || errorMessage;
      updateToastError(context.toastId, message);
    },
  });
};
