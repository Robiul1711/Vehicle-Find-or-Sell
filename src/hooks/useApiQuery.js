import { useQuery, keepPreviousData } from "@tanstack/react-query"; // ✅ Import keepPreviousData
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export const useApiQuery = ({
  queryKey,    // Example: ["users"]
  url,
  params = {}, // Example: { page: 1, search: "john" }
  enabled = true,
  secure = false,
  select,
}) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const axiosClient = secure ? axiosSecure : axiosPublic;

  return useQuery({
    // ✅ AUTO-REFETCH: Combine user's key with params so it refetches when params change
    queryKey: [...queryKey, params], 
    
    enabled,
    queryFn: async () => {
      const res = await axiosClient.get(url, { params });
      return res.data;
    },
    select,
    
    // ✅ v5 SYNTAX: This keeps the old data visible while fetching new data (smooth pagination)
    placeholderData: keepPreviousData, 
  });
};