import  Header from '../Header';
import { GelXIframe as MyIframe } from "@wdpui/gel-x";
import GelXIframe from "@wdpui/gel-x-iframe";
import WDPIFrame from "@wdpui/gel-x-iframe";

const HomePage = () => (
  <div>
    <Header/>
    <iframe src="something" />
    <MyIframe />
    <MyIframe sandbox="allow-modal" />
    <GelXIframe sandbox="allow-modal" />
    <WDPIFrame sandbox="allow-modal" />
  </div>
);

export default HomePage;