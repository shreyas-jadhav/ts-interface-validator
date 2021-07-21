import { Typography, Layout, PageHeader, Button, Descriptions, Space, Divider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
import { GithubOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Codeview from 'components/CodeView';
const { Modal }: any = require('antd');

const Home = () => {
	return (
		<Layout>
			<Header>
				<h1 style={{ color: 'white', fontWeight: 800, textAlign: 'center' }}>TypeScript Interface to JavaScript Validation</h1>
			</Header>
			<Content>
				<PageHeader
					ghost={false}
					backIcon={<></>}
					title='What this does?'
					subTitle='Generates validation code in JavaScript based function for an object of given TypeScript Interface.'
					extra={[
						<Button
							key='2'
							type='primary'
							icon={<ExclamationCircleOutlined />}
							onClick={() =>
								Modal.warning({
									title: `Limitations`,
									content: (
										<div>
											Please keep in mind the following limitations:
											<Divider />
											<ul>
												<li>
													Only Basic Types <code>string, number, boolean, undefined </code> are supported!{' '}
												</li>

												<li>It is recommended to not include comments in the code. Code must contain only a single valid typescript interface.</li>
											</ul>
										</div>
									),
								})
							}
						>
							Limitations
						</Button>,
						<Button key='1' icon={<GithubOutlined />} onClick={() => window.open(`https://github.com/shreyas-jadhav/ts-interface-validator`)}>
							Contribute
						</Button>,
					]}
				></PageHeader>

				<Codeview />
			</Content>
			<Footer>
				Developed by <b>Shreyas Jadhav</b>
			</Footer>
		</Layout>
	);
};

export default Home;
