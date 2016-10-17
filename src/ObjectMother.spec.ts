export const REMOTE_ADDRESS = '192.168.1.102';

export const NOTIFY_MESSAGE =
    'NOTIFY * HTTP/1.1\r\n' +
    'HOST: 239.255.255.250:1900\r\n' +
    'CACHE-CONTROL: max-age=1800\r\n' +
    'LOCATION: http://192.168.1.102:45895/rootdesc1.xml\r\n' +
    'OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01\r\n' +
    '01-NLS: 2ae7b584-1dd2-11b2-988f-983991d749b2\r\n' +
    'NT: urn:axis-com:service:BasicService:1\r\n' +
    'NTS: ssdp:byebye\r\n' +
    'SERVER: Linux/2.6.35, UPnP/1.0, Portable SDK for UPnP devices/1.6.18\r\n' +
    'X-User-Agent: redsonic\r\n' +
    'USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1\r\n';

export const MSEARCH_MESSAGE =
    'HTTP/1.1 200 OK\r\n' +
    'CACHE-CONTROL: max-age=1800\r\n' +
    'DATE: Sun, 02 Oct 2016 21:11:25 GMT\r\n' +
    'EXT:\r\n' +
    'LOCATION: http://192.168.1.102:45895/rootdesc1.xml\r\n' +
    'OPT: "http://schemas.upnp.org/upnp/1/0/"; ns=01\r\n' +
    '01-NLS: 8fb2638a-1dd2-11b2-a915-c89968cce2ca\r\n' +
    'SERVER: Linux/2.6.35, UPnP/1.0, Portable SDK for UPnP devices/1.6.18\r\n' +
    'X-User-Agent: redsonic\r\n' +
    'ST: urn:axis-com:service:BasicService:1\r\n' +
    'USN: uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8::urn:axis-com:service:BasicService:1\r\n';

export const ROOT_DESCRIPTION_DEFAULT_HTTP_PORT =
    '<?xml version="1.0"?>' +
    '<root xmlns="urn:schemas-upnp-org:device-1-0">' +
    '    <specVersion>' +
    '        <major>1</major>' +
    '        <minor>0</minor>' +
    '    </specVersion>' +
    '    <device>' +
    '        <deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>' +
    '        <friendlyName>AXIS M1014 - ACCC8E270AD8</friendlyName>' +
    '        <manufacturer>AXIS</manufacturer>' +
    '        <manufacturerURL>http://www.axis.com/</manufacturerURL>' +
    '        <modelDescription>AXIS M1014 Fixed Network Camera</modelDescription>' +
    '        <modelName>AXIS M1014</modelName>' +
    '        <modelNumber>M1014</modelNumber>' +
    '        <modelURL>http://www.axis.com/</modelURL>' +
    '        <serialNumber>ACCC8E270AD8</serialNumber>' +
    '        <UDN>uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8</UDN>' +
    '        <serviceList>' +
    '            <service>' +
    '                <serviceType>urn:axis-com:service:BasicService:1</serviceType>' +
    '                <serviceId>urn:axis-com:serviceId:BasicServiceId</serviceId>' +
    '                <controlURL>/upnp/control/BasicServiceId</controlURL>' +
    '                <eventSubURL>/upnp/event/BasicServiceId</eventSubURL>' +
    '                <SCPDURL>/scpd_basic.xml</SCPDURL>' +
    '            </service>' +
    '        </serviceList>' +
    '        <presentationURL>http://192.168.1.102:80/</presentationURL>' +
    '    </device>' +
    '    <URLBase>http://192.168.1.102:51578/</URLBase>' +
    '</root>';

export const ROOT_DESCRIPTION_DEFAULT_HTTPS_PORT =
    '<?xml version="1.0"?>' +
    '<root xmlns="urn:schemas-upnp-org:device-1-0">' +
    '    <specVersion>' +
    '        <major>1</major>' +
    '        <minor>0</minor>' +
    '    </specVersion>' +
    '    <device>' +
    '        <deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>' +
    '        <friendlyName>AXIS M1014 - ACCC8E270AD8</friendlyName>' +
    '        <manufacturer>AXIS</manufacturer>' +
    '        <manufacturerURL>http://www.axis.com/</manufacturerURL>' +
    '        <modelDescription>AXIS M1014 Fixed Network Camera</modelDescription>' +
    '        <modelName>AXIS M1014</modelName>' +
    '        <modelNumber>M1014</modelNumber>' +
    '        <modelURL>http://www.axis.com/</modelURL>' +
    '        <serialNumber>ACCC8E270AD8</serialNumber>' +
    '        <UDN>uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8</UDN>' +
    '        <serviceList>' +
    '            <service>' +
    '                <serviceType>urn:axis-com:service:BasicService:1</serviceType>' +
    '                <serviceId>urn:axis-com:serviceId:BasicServiceId</serviceId>' +
    '                <controlURL>/upnp/control/BasicServiceId</controlURL>' +
    '                <eventSubURL>/upnp/event/BasicServiceId</eventSubURL>' +
    '                <SCPDURL>/scpd_basic.xml</SCPDURL>' +
    '            </service>' +
    '        </serviceList>' +
    '        <presentationURL>http://192.168.1.102:443/</presentationURL>' +
    '    </device>' +
    '    <URLBase>http://192.168.1.102:51578/</URLBase>' +
    '</root>';

export const ROOT_DESCRIPTION_NO_PORT =
    '<?xml version="1.0"?>' +
    '<root xmlns="urn:schemas-upnp-org:device-1-0">' +
    '    <specVersion>' +
    '        <major>1</major>' +
    '        <minor>0</minor>' +
    '    </specVersion>' +
    '    <device>' +
    '        <deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>' +
    '        <friendlyName>AXIS M1014 - ACCC8E270AD8</friendlyName>' +
    '        <manufacturer>AXIS</manufacturer>' +
    '        <manufacturerURL>http://www.axis.com/</manufacturerURL>' +
    '        <modelDescription>AXIS M1014 Fixed Network Camera</modelDescription>' +
    '        <modelName>AXIS M1014</modelName>' +
    '        <modelNumber>M1014</modelNumber>' +
    '        <modelURL>http://www.axis.com/</modelURL>' +
    '        <serialNumber>ACCC8E270AD8</serialNumber>' +
    '        <UDN>uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8</UDN>' +
    '        <serviceList>' +
    '            <service>' +
    '                <serviceType>urn:axis-com:service:BasicService:1</serviceType>' +
    '                <serviceId>urn:axis-com:serviceId:BasicServiceId</serviceId>' +
    '                <controlURL>/upnp/control/BasicServiceId</controlURL>' +
    '                <eventSubURL>/upnp/event/BasicServiceId</eventSubURL>' +
    '                <SCPDURL>/scpd_basic.xml</SCPDURL>' +
    '            </service>' +
    '        </serviceList>' +
    '        <presentationURL>http://192.168.1.102</presentationURL>' +
    '    </device>' +
    '    <URLBase>http://192.168.1.102:51578/</URLBase>' +
    '</root>';

export const ROOT_DESCRIPTION_REQUIRED_PROPERTIES =
    '<?xml version="1.0"?>' +
    '<root xmlns="urn:schemas-upnp-org:device-1-0">' +
    '    <specVersion>' +
    '        <major>1</major>' +
    '        <minor>0</minor>' +
    '    </specVersion>' +
    '    <device>' +
    '        <deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>' +
    '        <friendlyName>AXIS M1014 - ACCC8E270AD8</friendlyName>' +
    '        <manufacturer>AXIS</manufacturer>' +
    '        <modelName>AXIS M1014</modelName>' +
    '        <UDN>uuid:Upnp-BasicDevice-1_0-ACCC8E270AD8</UDN>' +
    '        <serviceList>' +
    '            <service>' +
    '                <serviceType>urn:axis-com:service:BasicService:1</serviceType>' +
    '                <serviceId>urn:axis-com:serviceId:BasicServiceId</serviceId>' +
    '                <controlURL>/upnp/control/BasicServiceId</controlURL>' +
    '                <eventSubURL>/upnp/event/BasicServiceId</eventSubURL>' +
    '                <SCPDURL>/scpd_basic.xml</SCPDURL>' +
    '            </service>' +
    '        </serviceList>' +
    '    </device>' +
    '</root>';