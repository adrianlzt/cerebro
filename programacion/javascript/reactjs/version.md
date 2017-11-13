Exponer la version del package.json
https://github.com/facebookincubator/create-react-app/issues/2466

import { version } from '../package.json'
BEWARE: import { version } from '../package.json' exposes the whole of package.json in the build bundle, not just the version!
