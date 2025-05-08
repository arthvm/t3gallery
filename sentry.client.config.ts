import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://a51b70e6c6eabff494ccdda061b5f79e@o4509287372488704.ingest.us.sentry.io/4509287402831872",

	integrations: [Sentry.replayIntegration()],
	replaysSessionSampleRate: 1.0,
	replaysOnErrorSampleRate: 1.0,
});
