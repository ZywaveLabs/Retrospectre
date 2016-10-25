/* global ServiceConfiguration:false */

// run with
// sudo GoogleClientId="<Your client id>" GoogleSecret="<Your secret>" meteor
// Note, unless changing client or secret, you only need to do this once
if(process.env.GoogleClientId !== undefined && process.env.GoogleSecret !== undefined){
    ServiceConfiguration.configurations.upsert({
        service: "google"
    }, {
        $set: {
            clientId: process.env.GoogleClientId,
            secret: process.env.GoogleSecret,
            loginStyle: "popup"
        }
    });
}
