import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {projectId: 'hfmu7ifg', dataset: 'production'},
  studioHost: 'bioagroup',
  deployment: {appId: 'mf0v4nq5f04nykdqv6wqfph0', autoUpdates: false},
})
