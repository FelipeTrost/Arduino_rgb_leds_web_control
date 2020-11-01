#include <EtherCard.h>
#include <LedPatterns.h>

// Led strip
NeoPatterns led1(30, 3, NEO_GRB + NEO_KHZ800);

// Ethernet interface mac address
static byte mymac[] = { 0x74, 0x69, 0x69, 0x2D, 0x30, 0x31 };

// Save incomming requests
String request = "";

// Key + identification for get requests
char* key = "GET /9EG7tu5K6MXAcKtruaRIgjE6MYhitD7o/";
uint8_t keyLen = 38;

byte Ethernet::buffer[500];
BufferFiller bfill;

void setup () {
  Serial.begin(57600);

  Serial.println(String("/rgb/345/345/345").indexOf("/rgb"));

  // Iitialize led strip
  led1.begin();

  Serial.println(F("\n[Server]"));

  if (ether.begin(sizeof Ethernet::buffer, mymac, SS) == 0)
    Serial.println(F("Failed to access Ethernet controller"));

  Serial.println(F("Setting up DHCP"));
  if (!ether.dhcpSetup())
    Serial.println(F("DHCP failed"));

  ether.printIp("My IP: ", ether.myip);
  ether.printIp("Netmask: ", ether.netmask);
  ether.printIp("GW IP: ", ether.gwip);
  ether.printIp("DNS IP: ", ether.dnsip);
}

void loop () {
  led1.Update();

  // If there is a request it will be saved to the request variable
  if (getHttp()) {
    Serial.print("Got valid request: ");
    Serial.println(request);

    // Update led strip based on requests
    if (request == "/rainbow")
      led1.RainbowCycle(20);
    else if (request == "/simplerainbow")
      led1.simpleRainbowCycle(20);
    else if (request == "/red")
      led1.ColorWipe(led1.Color(255, 0, 0), 10);
    else if (request == "/blue")
      led1.ColorWipe(led1.Color(0, 255, 0), 10);
    else if (request == "/green")
      led1.ColorWipe(led1.Color(0, 0, 255), 10);
    else if (request == "/off")
      led1.ColorWipe(led1.Color(0, 0, 0), 10);
    else if (request.indexOf("/interval") == 0) {
      int interval  = request.substring(10).toInt();

      Serial.print("New LED interval: ");
      Serial.print(interval);

      led1.Interval = interval;

    }else if (request.indexOf("/rgb") == 0) {
      String temp = request.substring(5);

      int r  = temp.substring(0, temp.indexOf("/")).toInt();
      temp = temp.substring(temp.indexOf("/")+1);

      int g  = temp.substring(0, temp.indexOf("/")).toInt();
      temp = temp.substring(temp.indexOf("/")+1);

      int b  = temp.toInt();

      Serial.print("Color: ");
      Serial.print(r);
      Serial.print(" ");
      Serial.print(g);
      Serial.print(" ");
      Serial.println(b);

      led1.ColorWipe(led1.Color(r, b, g), 10);
    }

  }
}

bool getHttp() {
  word len = ether.packetReceive();
  word pos = ether.packetLoop(len);

  // check if valid tcp data is received
  if (pos) {

    char * incomingData = (char *) Ethernet::buffer + pos;

    Serial.println("\n---------------REQUEST---------------------");
    Serial.println(incomingData);
    Serial.println("------------------------------------");

    // Check if it is a get request and if the request contains the only key
    if (strncmp(key, incomingData, keyLen) == 0) {
      char * c = strstr (incomingData, "HTTP");

      // This substring should contain the request without the key
      String req = String(incomingData).substring( keyLen - 1, ((int) (c - incomingData)) - 1);

      // Update the global request key
      request = req;

      // Send a response containing true
      ether.httpServerReply(HTTPresponse("true"));
      return true;
    } else {
      Serial.println("Wrong request\n");

      // Send a response containing true
      ether.httpServerReply(HTTPresponse("false"));
    }
  }

  // If we haven't returned we haven't gotten a valid http request
  return false;
}

static word HTTPresponse(char * message) {
  bfill = ether.tcpOffset();
  bfill.emit_p(PSTR(
                 "HTTP/1.0 200 OK\r\n"
                 "Content-Type: text/html\r\n"
                 "Pragma: no-cache\r\n"
                 "\r\n"
                 "$S"),
               message
              );
  return bfill.position();
}
