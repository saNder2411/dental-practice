import { Card, Table } from 'antd';
// Components
import { MainLayout } from '../components';
// Hooks
// import { useApi } from '../lib/useApi';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    filterMultiple: false,
    onFilter: (value: any, record: any) => record.address.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const ENDPOINT_1 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists/getbytitle('HR03-Team Calendar')/Items?select=Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,LookupHR01team\/Id,LookupCM102customers\/Id,LookupMultiBP01offerings\/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd&$expand=LookupMultiBP01offerings,LookupCM102customers,LookupHR01team&$orderby=FilterStart asc`;
const ENDPOINT_2 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists(guid'{HR03-Team Calendar}')`;
const ENDPOINT_3 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists/getbytitle('HR03-Team Calendar')/Items?select=Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,LookupHR01team\/Id,LookupCM102customers\/Id,LookupMultiBP01offerings\/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd&$filter=(FilterStart ge datetime'2020-07-02T011:30:00.000Z') and (FilterEnd le datetime'2016-04-03T10:30:00.000Z')&$expand=LookupMultiBP01offerings,LookupCM102customers,LookupHR01team&$orderby=FilterStart asc`;
const ENDPOINT_4 = `https://sa-client.metroapps.online/_api/Web/Lists/GetByTitle('SPRESTAPILearning')/Fields?$select=Title,InternalName&$filter=ReadOnlyField%20eq%20false`;

interface DentalTableProps {
  dentalData: any;
}

const DentalTable = ({ dentalData }: DentalTableProps) => {
  // const fetchState = useApi(`/api/list`);

  return (
    <MainLayout>
      <section style={{ background: 'tomato', textAlign: 'center', padding: 30 }}>
        <h2>Data Table</h2>
      </section>
      <Table columns={columns as any} dataSource={data} />
      <Card title="Table information:" bordered={false}>
        <pre>
          <code>{JSON.stringify(dentalData, null, 2)}</code>
        </pre>
      </Card>
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const dentalRes = await fetch('http://localhost:3000/api/table-data');
  const dentalData = await dentalRes.json();

  return { props: { dentalData } };
};

export default DentalTable;
