import { NextApiRequest, NextApiResponse } from 'next';
import {} from '@auth0/nextjs-auth0';
// Auth0
import auth0 from '../../lib/auth0';

const ENDPOINT_1 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists/getbytitle('HR03-Team Calendar')/Items?select=Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,LookupHR01team\/Id,LookupCM102customers\/Id,LookupMultiBP01offerings\/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd&$expand=LookupMultiBP01offerings,LookupCM102customers,LookupHR01team&$orderby=FilterStart asc`;
const ENDPOINT_2 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists(guid'{HR03-Team Calendar}')`;
const ENDPOINT_3 = `https://sa-toniguy01.metroapps.online/site/_api/web/lists/getbytitle('HR03-Team Calendar')/Items?select=Title,ID,EventDate,EndDate,AppointmentStatus,AppointmentSource,Description,Notes,MetroRRule,MetroRecException,EventType,MasterSeriesItemID,RecurrenceID,Duration,LookupHR01team\/Id,LookupCM102customers\/Id,LookupMultiBP01offerings\/Id,fAllDayEvent,TrackingComments,FirstName,LastNameAppt,CellPhone,Email,SubmissionIdUIT,FilterStart,FilterEnd&$filter=(FilterStart ge datetime'2020-07-02T011:30:00.000Z') and (FilterEnd le datetime'2016-04-03T10:30:00.000Z')&$expand=LookupMultiBP01offerings,LookupCM102customers,LookupHR01team&$orderby=FilterStart asc`;
const ENDPOINT_4 = `https://sa-client.metroapps.online/_api/Web/Lists/GetByTitle('SPRESTAPILearning')/Fields?$select=Title,InternalName&$filter=ReadOnlyField%20eq%20false`;


interface User {
  nickname: string;
  name: string;
  picture: string;
  updated_at: Date;
  sub: string;
}

interface Session {
  user: User;
  createdAt: number;
  idToken: string;
  accessToken: string;
  accessTokenScope: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
}

interface Auth0Token {
  access_token: string;
  token_type: string;
}

interface SPAccessData {
  identities: Array<{ access_token: string }>;
}

const getAccess = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = (await auth0.getSession(req)) as Session | null | undefined;
    const responseAuth0Token = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.API_CLIENT_ID,
        client_secret: process.env.API_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    });

    const dataAuth0Token: Auth0Token | undefined | null = await responseAuth0Token.json();

    const responseSPAccess = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${session?.user.sub}`, {
      method: 'GET',
      headers: { authorization: `Bearer ${dataAuth0Token?.access_token}` },
    });

    const dataSPAccess: SPAccessData | undefined | null = await responseSPAccess.json();

    process.env.accessToken = dataSPAccess?.identities ? dataSPAccess?.identities[0].access_token : `undefined`;

    console.log(`env api`, process.env.accessToken);

    const tableData = await fetch(ENDPOINT_1, {
      method: 'GET',
      headers: {
        'content-type': 'application/json;odata=verbose',
        authorization: `Bearer ${process.env.accessToken}`,
      },
    });

    console.log(`tableData`, tableData);

    res.json({ session, dataAuth0Token, dataSPAccess });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};
export default getAccess;
