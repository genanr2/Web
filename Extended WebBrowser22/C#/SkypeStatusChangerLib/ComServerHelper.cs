using System.Diagnostics;

namespace SkypeStatusChangerLib
{
    public static class ComServerHelper
    {
        private const string RegSvr32 = "regsvr32";

        public static bool RegisterComServer(string serverPath)
        {
            return startRegSvr32Process("/s ", serverPath);
        }

        public static bool UnregisterComServer(string serverPath)
        {
            return startRegSvr32Process("/u /s", serverPath);
        }

        private static bool startRegSvr32Process(string parameters, string serverPath)
        {
            using (var proc = new Process())
            {
                proc.StartInfo = new ProcessStartInfo(RegSvr32, string.Concat(parameters, getEnclosedByQuotes(serverPath)));
                return proc.Start();
            }
        }

        private static string getEnclosedByQuotes(string s)
        {
            return string.Concat('"', s, '"');
        }
    }
}
