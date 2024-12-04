const LOGGER_SEVERITY_LEVELS = { // From https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
  DEBUG: 'DEBUG',	       // (100) Debug or trace information.
  INFO: 'INFO',	         // (200) Routine information, such as ongoing status or performance.
  WARNING: 'WARNING',    // (400) Warning events might cause problems.
  ERROR: 'ERROR',	       // (500) Error events are likely to cause problems.
}

export { LOGGER_SEVERITY_LEVELS };
