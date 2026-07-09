const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com',
  '10minutemail.net',
  'dispostable.com',
  'dropmail.me',
  'emailondeck.com',
  'fakeinbox.com',
  'getairmail.com',
  'getnada.com',
  'guerrillamail.biz',
  'guerrillamail.com',
  'guerrillamail.de',
  'guerrillamail.net',
  'guerrillamail.org',
  'maildrop.cc',
  'mailinator.com',
  'mailinator.net',
  'mailinator.org',
  'mailnesia.com',
  'mailnull.com',
  'mintemail.com',
  'moakt.com',
  'mytemp.email',
  'sharklasers.com',
  'spamgourmet.com',
  'temp-mail.org',
  'tempmail.com',
  'tempmail.net',
  'tempmailo.com',
  'throwaway.email',
  'trashmail.com',
  'trashmail.net',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
]);

const FREE_EMAIL_DOMAINS = new Set([
  'aol.com',
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'hotmail.co.uk',
  'icloud.com',
  'live.com',
  'mail.com',
  'me.com',
  'msn.com',
  'outlook.com',
  'proton.me',
  'protonmail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'ymail.com',
]);

const BLOCKED_EMAIL_SUFFIXES = [
  'mailinator.com',
  'mailinator.net',
  'mailinator.org',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
];

export function getEmailDomain(email) {
  const normalized = email?.trim().toLowerCase();
  if (!normalized || !normalized.includes('@')) {
    return null;
  }

  const [, domain] = normalized.split('@');
  return domain || null;
}

export function isBlockedSignupEmail(email) {
  const domain = getEmailDomain(email);
  if (!domain) {
    return true;
  }

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain) || FREE_EMAIL_DOMAINS.has(domain)) {
    return true;
  }

  return BLOCKED_EMAIL_SUFFIXES.some(
    (suffix) => domain === suffix || domain.endsWith(`.${suffix}`),
  );
}

export const BLOCKED_SIGNUP_EMAIL_MESSAGE =
  'Please use a business email address. Personal and disposable email providers are not accepted.';

export function isHoneypotTriggered(honeypotValue) {
  return Boolean(honeypotValue?.trim());
}
