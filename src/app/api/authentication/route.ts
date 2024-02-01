const vrchat = require('vrchat')


type Credentials = {
    username: string,
    password: string
}

export async function POST(request: Request) {
    // const res = await fetch('https://data.mongodb-api.com/...', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.DATA_API_KEY,
    //   },
    // })
    // const data = await res.json()

    // return Response.json({ data })
    if (!request.body) return new Response('Failed!', {
        status: 400
    })

    let body: Credentials = await request.json()

    if (!body.username || !body.password) return new Response('Failed!', {
        status: 400
    })
    const configuration = await new vrchat.Configuration({
        apiKey: process.env.VRC_API_KEY,
        username: body.username,
        password: body.password,
        basePath: "https://vrchat.com/api/1",
        baseOptions: {
            headers: {
                "User-Agent": "XXX/0.0.0 xxx@xxx",
            }
        }
    })
    console.log("configuration", configuration)
    const authenticationApi = await new vrchat.AuthenticationApi(configuration);
    authenticationApi.getCurrentUser().then(async (resp: any) => {
        console.log(resp.data)
        const currentUser = resp.data;
        console.log(`Logged in as: ${currentUser.displayName}`);
    }).catch((err: any) => {
        console.log("err", err)
    })
}