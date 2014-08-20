# windows-eventlog-edge

Node module for writing to the Windows EventLog.  This module uses Edge.js and requires .Net

Some of the naming conventions are intentionally `PascalCase` to match up against the .Net conventions, when you create a logger, you'll get to more familiar javascript-style `camelCase` syntax.

NOTE: There is a binary npm module called [windows-eventlog](https://www.npmjs.org/package/windows-eventlog).  If you prefer to avoid the .Net runtime requirement for your deployments.


## Installation

```
npm install --save windows-eventlog-edge
```

## Usage


```javascript
// Import the module
var EventLog = require('windows-eventlog-edge');

// Create a logger via the generator methods
var logger = EventLog.Application('my-application');
  /*  EventLog.Application
      EventLog.Security
      EventLog.Setup
      EventLog.System
  	  EventLog.ForwardedEvents
  */

//Use the logger
logger.info('message');
logger.warn('message');
logger.error('message');
logger.successAudit('message');
logger.failureAudit('message');
```

#### NOTES

The above methods in the end are friendly wrappers for calling:

```
logger.log(logEntryType)
```

Which in turn calls...

```
EventLog(logName, logEntryType, sourceName, event)
```

**logName** is the name of the eventlog you are writing to:
* `Application`
* `Security`
* `Setup`
* `System`
* `Forwarded Events`

**logEntryType** is the type of entry being made:
* Error (1)
* Warning (2)
* Information (3)
* SuccessAudit (8)
* FailureAudit (16)

In general, you should stick to error, warning, and information.

**sourceName** is the name of your application/service/module.

**event** is the message you want to log.
