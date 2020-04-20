from __future__ import print_function
from incapsula import IncapSession
session = IncapSession()
session.cookies.set('cookie-key', 'cookie-value')
response = session.get('http://whoscored.com', headers={'Referer': 'http://whoscored.com'})
print(session.cookies)



    
