# Description: This program will be executed only when we have a new password file.

from cryptography.fernet import Fernet
import os

### 1. read your password file
with open('pwd.txt') as f:
    mypwd = ''.join(f.readlines())

### 2. generate key and write it in a file
key = Fernet.generate_key()
f = open("refKey.txt", "wb")
f.write(key)
f.close()

### 3. encrypt the password and write it in a file
refKey = Fernet(key)
mypwdbyt = bytes(mypwd, 'utf-8') # convert into byte
encryptedPWD = refKey.encrypt(mypwdbyt)
f = open("encryptedPWD.txt", "wb")
f.write(encryptedPWD)
f.close()
### 4. delete the password file
if os.path.exists("pwd.txt"):
  os.remove("pwd.txt")
else:
  print("File is not available")
  with open('encryptedPWD.txt') as f:
    encpwd = ''.join(f.readlines())
    encpwdbyt = bytes(encpwd, 'utf-8')
f.close()

# read key and convert into byte
with open('refKey.txt') as f:
    refKey = ''.join(f.readlines())
    refKeybyt = bytes(refKey, 'utf-8')
f.close()

# use the key and encrypt pwd
keytouse = Fernet(refKeybyt)
myPass = (keytouse.decrypt(encpwdbyt))
print("my password - ",myPass)
