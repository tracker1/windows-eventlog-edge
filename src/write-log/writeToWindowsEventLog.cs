using System;
using System.Diagnostics;
using System.Threading.Tasks;

public class Startup
{
    public async Task<object> Invoke(dynamic input)
    {
        await Task.Run(() => {
            string log = input.log as string;
            string source = input.source as string;
            string message = input.message as string;
            EventLogEntryType type = (EventLogEntryType)Enum.Parse(typeof(EventLogEntryType), input.type as string ?? "Information", true);

            if (!EventLog.SourceExists(source))
                EventLog.CreateEventSource(source, log);

            EventLog.WriteEntry(source, message, type);
        });

        return new { success = true };
    }
}