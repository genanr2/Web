using System;
using System.Diagnostics;
using System.IO;
using Microsoft.Win32;
using SKYPE4COMLib;

namespace SkypeStatusChangerLib.SkypeApi
{
    public class SkypeHelper
    {
        private const string RegistrySkypePath = @"Software\Skype\Phone";
        private const string SkypePath = "SkypePath";
        private const string SkypeProcessName = "Skype";
        private const string Skype4ComDll = @"Skype\Skype4COM.dll";
        public const int SkypeProtocol = 7;

        private readonly Skype _skype;

        public SkypeHelper()
        {
            try
            {
                _skype = new Skype();
                _skype.Attach(SkypeProtocol, true);
            }
            catch (Exception ex)
            {
                Console.WriteLine("top lvl exception : " + ex.ToString());
            }
        }

        public bool SetUserStatus(UserStatus status)
        {
            try
            {
                _skype.ChangeUserStatus((TUserStatus) status);
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        public UserStatus GetUserStatus()
        {
            // bug: enum inconsistency
            return (UserStatus) _skype.CurrentUser.OnlineStatus;
        }

        public static bool IsSkypeInstalled()
        {
           using (RegistryKey skypePathKey = Registry.LocalMachine.OpenSubKey(RegistrySkypePath))
           {
               return skypePathKey != null && skypePathKey.GetValue(SkypePath) != null;
           }
        }

        public static bool IsSkypeRunning()
        {
            return Process.GetProcessesByName(SkypeProcessName).Length > 0;
        }

        public static string GetSkype4ComPath()
        {
            string commonProgramFilesPath = Environment.Is64BitOperatingSystem
                                          ? Environment.GetFolderPath(Environment.SpecialFolder.CommonProgramFilesX86)
                                          : Environment.GetFolderPath(Environment.SpecialFolder.CommonProgramFiles);

            return Path.Combine(commonProgramFilesPath, Skype4ComDll);
        }
    }
}
