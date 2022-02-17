import { Box, Checkbox, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";

interface CategoriesProps {
	id: string;
	name: string;
}

interface CategoriesStatus {
	categories: Array<CategoriesProps>;
	loading: boolean;
}

const Categories = () => {
	const [categoriesStatus, setCategoriesStatus] = useState<CategoriesStatus>({
		categories: [],
		loading: true,
	});

	useEffect(() => {
		const fetchCategoriesData = async () => {
			setCategoriesStatus({ ...categoriesStatus, loading: true });
			const res = await getCategories();
			setCategoriesStatus({ categories: res, loading: false });
		};
		fetchCategoriesData();
	}, []);

	if (categoriesStatus.loading) {
		return(<Spinner />);
	} else {
		return (
			<Box
				w={"60"}
				bg="white"
				h={"fit-content"}
				p={"4"}
				className="sticky rounded-lg shadow top-20"
			>
				<h4 className="mb-2 text-2xl font-bold">Categorias</h4>
				<hr />
				<aside className="mt-4 ml-1">
					{categoriesStatus.categories.map((element, i) => {
						return (
							<div key={i} className="mb-2">
								<Checkbox>
									<span className="text-lg hover:underline hover:text-blue-400">
										{element.name}
									</span>
								</Checkbox>
							</div>
						);
					})}
				</aside>
			</Box>
		);
	}
};

export default Categories;
