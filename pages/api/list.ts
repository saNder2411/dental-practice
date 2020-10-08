import { NextApiRequest, NextApiResponse } from 'next';
// Auth0
import auth0 from '../../lib/auth0';

const ENDPOINT_1 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists/getbytitle('HR03-Team Calendar')/Items?select=Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,LookupHR01team\/Id,LookupCM102customers\/Id,LookupMultiBP01offerings\/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd&$expand=LookupMultiBP01offerings,LookupCM102customers,LookupHR01team&$orderby=FilterStart asc`;
const ENDPOINT_2 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists(guid'{HR03-Team Calendar}')`;
const ENDPOINT_3 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists/getbytitle('HR03-Team Calendar')/Items?select=Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,LookupHR01team\/Id,LookupCM102customers\/Id,LookupMultiBP01offerings\/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd&$filter=(FilterStart ge datetime'2020-07-02T011:30:00.000Z') and (FilterEnd le datetime'2016-04-03T10:30:00.000Z')&$expand=LookupMultiBP01offerings,LookupCM102customers,LookupHR01team&$orderby=FilterStart asc`;
const ENDPOINT_4 = `https://sa-client.metroapps.online/_api/Web/Lists/GetByTitle('SPRESTAPILearning')/Fields?$select=Title,InternalName&$filter=ReadOnlyField%20eq%20false`;
const ENDPOINT_5 = `https://api.github.com/search/repositories?q=created:%3E2020-07-01&sort=stars&order=desc`;

const getList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = await auth0.getSession(req);
    const dentalRes = await fetch(ENDPOINT_1, {
      method: 'GET',
      headers: {
        Accept: 'application/json;odata=verbose',
        Authorization: `Bearer ${accessToken?.accessToken}`,
      },
    });

    const dentalData = await dentalRes.json();

    res.json({ accessToken, dentalData });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};
export default getList;
