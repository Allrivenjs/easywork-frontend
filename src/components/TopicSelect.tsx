import { Select, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";
import { CategoriesProps } from "./Categories";

interface ICategoriesSelectProps {
	onChange: (e: any) => void,
}

interface ICategoriesSelectState {
	topics: Array<CategoriesProps>;
	loading: boolean;
}

const CategoriesSelect = (props: ICategoriesSelectProps) => {
	const [topicSelectState, setTopicSelectState] = useState<ICategoriesSelectState>({
		topics: [],
		loading: true,
	});

	useEffect(() => {
		const source = axios.CancelToken.source();

		const fetchCategoriesData = async () => {
			try {
				setTopicSelectState({ ...topicSelectState, loading: true });
				const res = await getCategories(source);
				if (res) {
					setTopicSelectState({ topics: res, loading: false });
				}

			} catch (e) {
				console.log("Error fetching categories: ", e);
			}
		};
		fetchCategoriesData();

		return () => {
			source.cancel();
		};
	}, []);

	if (topicSelectState.loading) {
		return(
			<div className="w-full text-center">
				<Spinner />
			</div>
		);
	} else {
		return(
			<Select
				name="topic"
				onChange={props.onChange}
				required
			>
				{
					topicSelectState.topics.map((element, i) => {
						return(
							<option key={i} value={element.id}>{element.name}</option>
						);
					})
				}
			</Select>
		);
	}
};

export default CategoriesSelect;
