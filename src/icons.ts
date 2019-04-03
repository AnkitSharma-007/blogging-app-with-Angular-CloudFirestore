import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons/faRedditAlien';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons/faPinterestP';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

const icons = [
    faFacebookF, faTwitter, faLinkedinIn, faPinterestP, faRedditAlien,
    faWhatsapp, faEnvelope, faPrint, faEllipsisH, faMinus,
];

library.add(...icons);
