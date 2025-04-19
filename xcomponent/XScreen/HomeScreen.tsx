import React, { useContext, useEffect } from 'react'
import XBase from '../XBase/XBase'
import TQRCode from '../TQRCode';
import { HomeScreenProp } from '../../Navigation';
import { getString } from '../../AppLanguage';
import { language } from '../../AppConstants';
import FooterButtonFactory from '../../util/FooterButtonFactory';
import { TransferoContext } from '../../TransferoContext';
import { ApplicationEvent } from '../../type/ApplicationTypes';
import ClientIOHandler from '../../handler/ClientIOHandler';
import ServerIOHandler from '../../handler/ServerIOHandler';

const LOCATION = 'HomeScreen';

const HomeScreen = (screenProp: HomeScreenProp) => {
  const context = useContext(TransferoContext);
  if (!context) return <></>;

  useEffect(() => {
    context.onEvent({
      eventName: ApplicationEvent.PAIRING_COMPLETED,
      eventLocation: LOCATION,
      eventCallback: () => screenProp.navigation.navigate('FileSelection'),
    })

    ClientIOHandler.destroy(context);
    ClientIOHandler.init(context);
    ServerIOHandler.destroy(context);
    ServerIOHandler.init(context);

    return () => context.rmAllEvents(LOCATION);
  }, []);

  return (
    <XBase
      description={getString(language, 'welcome-description')}
      footerContent={[
        FooterButtonFactory.tutorialButton(undefined),
        FooterButtonFactory.scanButton(screenProp, undefined),
      ]}>
      <TQRCode data={screenProp.route.params} />
    </XBase>
  )
}

export default HomeScreen