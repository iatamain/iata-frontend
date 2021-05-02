import { useParams } from "react-router-dom";
const Course = () => {
	const { course } = useParams();
	return <div>Course: {course}</div>;
};
export { Course };
