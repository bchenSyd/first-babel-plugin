import  Header from '../Header';
import { Flyout, GelXIFrame as MyIframe} from "@wdpui/gel-x";
import GelXIframe from "@wdpui/gel-x-iframe";
import WDPIFrame from "@wdpui/gel-x-iframe";

const HomePage = () => (
  <div>
    <Header/>
    <iframe src="something" />
    <MyIframe />
    <Flyout/>
    <MyIframe sandbox="allow-modal111" />
    <GelXIframe sandbox="allow-modal222" />
    <WDPIFrame sandbox="allow-modal333" />
  </div>
);

export default HomePage;