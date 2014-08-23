# windows-eventlog-edge


## WORK IN PROGRESS - DO NOT USE
## WORK IN PROGRESS - DO NOT USE
## WORK IN PROGRESS - DO NOT USE

This is a work in progress, I've only got some very basic functionality.. the details below are the interface I intend to provide.

## WORK IN PROGRESS - DO NOT USE
## WORK IN PROGRESS - DO NOT USE
## WORK IN PROGRESS - DO NOT USE

-----

Node module for writing to the Windows EventLog.  This module uses Edge.js and requires .Net

Some of the naming conventions are intentionally `PascalCase` to match up against the .Net conventions, when you create a logger, you'll get to more familiar javascript-style `camelCase` syntax.

NOTE: There is a binary npm module called [windows-eventlog](https://www.npmjs.org/package/windows-eventlog).


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
  /*
      WARINING: After a log call, 'my-application' will be 
      bound to the specified log ("Application" in the example).  
      All future log entries for 'my-application' will go to 
      that log regardless of the generator specified after.

      EventLog.Application
      EventLog.Security
      EventLog.Setup
      EventLog.System
  	  EventLog.ForwardedEvents
  */

//Use the logger
//  logger.TYPE(message, [params...], [callback])
logger.info('message');
logger.warn('message %s', new Date());
logger.error('message');
logger.success('message', function(err){
	if (err) console.error(err);
});
logger.failure('message');
```

When you pass an object as the message it is formatted with `JSON.stringify(message, null, 4)`.  Objects (Errors) will keep their `name`. `message` and `stack` properties.

When you pass other arguments, [`util.format`](http://nodejs.org/api/util.html#util_util_format_format) will be used.

**WARNING**

*The first time a log entry is called, it will register the EventLog source, which will bind your `"my-application"` to that log. Guture calls will go to that log regardless of which log you specify after.*

*Your best bet is to stick to the `Application` log.*


#### NOTES

The above methods in the end are friendly wrappers for calling:

```
EventLog(options, callback)
```
**options**
* **log** is the name of the eventlog you are writing to:
  * `Application` (default)
  * `Security`
  * `Setup`
  * `System`
  * `Forwarded Events`
* **type** is the type of entry being made:
  * `Error` (1)
  * `Warning` (2)
  * `Information` (3) (default)
  * `SuccessAudit` (8)
  * `FailureAudit` (16)
* **source** is the name of your application/service/module.
  * defaults to `module.parent.filename`  
* **message** is the message you want to log.
