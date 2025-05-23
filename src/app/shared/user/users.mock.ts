export const generateMockUsers = (count: number) => {
  const names = ['João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Julia', 'Carlos', 'Fernanda', 'Rafael', 'Amanda'];
  const lastnames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Gomes', 'Costa'];
  const domains = ['@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com.br'];
  const statuses = ['active', 'inactive', 'pending'];
  const languages = ['english', 'portuguese', 'spanish'];
  const accessProfile = ['admin', 'analyst', 'supervisor', 'operator'];
  const preferredContact = ['email', 'phone', 'both'];

  const getRandomDate = (start: Date, end: Date) => 
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  return Array.from({ length: count }, (_, i) => {
    const name = names[Math.floor(Math.random() * names.length)];
    const lastname = lastnames[Math.floor(Math.random() * lastnames.length)];
    const createdAt = getRandomDate(new Date(2020, 0, 1), new Date());
    const language = languages[Math.floor(Math.random() * languages.length)];
    const profile = accessProfile[Math.floor(Math.random() * accessProfile.length)];
    const contact = preferredContact[Math.floor(Math.random() * preferredContact.length)];
    
    return {
      name: name,
      lastname: lastname,
      email: `${name.toLowerCase()}.${lastname.toLowerCase()}${Math.floor(Math.random() * 100)}${domains[Math.floor(Math.random() * domains.length)]}`,
      phone: `${String(Math.floor(10 + Math.random() * 90)).padStart(2, '0')} 9${String(Math.floor(Math.random() * 8999) + 1000)}-${String(Math.floor(Math.random() * 8999) + 1000)}`,
      status: statuses[i % 3],
      createdAt: createdAt,
      languages: [language],
      accessProfile: profile,
      preferredContact: contact
    };
  });
};