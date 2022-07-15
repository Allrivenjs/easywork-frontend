import { Box, Checkbox, Skeleton, SkeletonText } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";

export interface CategoriesProps {
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
		const source = axios.CancelToken.source();

		const fetchCategoriesData = async () => {
			try {
				setCategoriesStatus({ ...categoriesStatus, loading: true });
				const res = await getCategories(source);
				if (res) {
					setCategoriesStatus({ categories: res, loading: false });
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

	if (categoriesStatus.loading) {
		return (
			<Box
				w={"60"}
				bg="white"
				h={"fit-content"}
				p={"4"}
				mb={"6"}
				className="sticky rounded-lg shadow top-20"
			>
				<Skeleton w={"32"} height='20px' mb={4} />
				<hr />
				<SkeletonText mt='4' noOfLines={16} spacing='4' />
			</Box>
		);
	} else {
		return (
			<Box
				w={"60"}
				bg="white"
				h={"fit-content"}
				p={"4"}
				mb={"6"}
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
