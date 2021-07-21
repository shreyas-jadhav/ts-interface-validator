import { Row, Col, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
const { Title } = Typography;
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import(`@monaco-editor/react`), { ssr: false });
import useConverter from 'hooks/useConverter';

const Codeview = () => {
	const { handleTypeScriptChange, typescript, javascript } = useConverter();
	return (
		<Content>
			<Row>
				<Col xs={24} md={12}>
					<Editor theme='vs-dark' height='70vh' value={typescript} onChange={handleTypeScriptChange} defaultLanguage='typescript' defaultValue='// paste your typescript interface here' />
				</Col>
				<Col xs={24} md={12}>
					<Editor theme='vs-dark' height='70vh' defaultLanguage='typescript' value={javascript} defaultValue='// validation code would appear here' />
				</Col>
			</Row>
		</Content>
	);
};

export default Codeview;
