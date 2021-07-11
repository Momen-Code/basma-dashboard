import axios from "axios";
import { useAppContext } from "../../../Providers";

const useStatistics = () => {
	const { createNotification, setIsLoading } = useAppContext();

	const getData = async ({ employeeId, day }) => {
		try {
      console.log(day);
      setIsLoading(true);
			if (!day) {
				return createNotification("يجب اختيار اليوم", "warning");
			}

			console.log(day);
			let response = await axios.post("/api/transactions/get", {
				employeeId,
				day,
			});

			let data = await response.data;
			console.log(data);

			if (!data.status) {
				createNotification(data.message, "error");
				return {};
			}
			return data.data;
		} catch (e) {
			alert(e.message);
			return {};
		} finally {
			setIsLoading(false);
		}
	};

	return { getData };
};

export default useStatistics;
