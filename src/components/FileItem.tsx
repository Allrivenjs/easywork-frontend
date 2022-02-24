import { IconButton } from "@chakra-ui/react";
import { IconType } from "react-icons";

import {
	GrDocumentImage,
	GrDocumentPdf,
	GrDocumentTxt,
	GrDocumentWord,
	GrDocumentZip,
} from "react-icons/gr";

// 'mimes:png,jpg,jpeg,csv,txt,xlx,xls,pdf,doc,docx|max:2048'

const MimeFile = [
	{
		mime: "txt",
		element: <GrDocumentTxt />,
	},

	{
		mime: "png",
		element: <GrDocumentImage />,
	},

	{
		mime: "pdf",
		element: <GrDocumentPdf />,
	},

	{
		mime: "word",
		element: <GrDocumentWord />,
	},

	{
		mime: "zip",
		element: <GrDocumentZip />,
	},
];

interface FileItemProps {
	mime: string;
	url: string;
}

const FileItem = (props: FileItemProps) => {
	const returnIconFromMime = (mime: string): Element | undefined => {
		const a = MimeFile.find((e) => {
			return e.mime === mime;
		});
		return a?.element;
	};

	return (
		<a download href={props.url}>
			{/* {console.log(MimeFile[props.mime])} */}
			<IconButton
				size={"lg"}
				bgColor="blue.100"
				aria-label="File button"
				icon={<>{returnIconFromMime(props.mime)}</>}
			/>
		</a>
	);
};

export default FileItem;
