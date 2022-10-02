import logging
import threading
from threading import Thread
from socket import socket
import time

class HoneyPot (object):
    def __init__(self, ports, logfile_path, capture_path, host):
        if len(ports) < 1:
            raise Exception("No ports provided")
        self.lock = threading.Lock()
        self.ports = ports
        self.host = host
        self.logfile_path = logfile_path
        self.capture_path = capture_path
        self.listeners = []
        logging.basicConfig(
            level=logging.DEBUG,
            format='%(asctime)s %(levelname)-8s %(message)s',
            datefmt='%m-%d %H:%M:%s',
            filename=logfile_path,
            filemode='a'
        )
        self.capture_path = capture_path
        self.logger = logging.getLogger(__name__)
        self.logger.info("ArgusPot Initializing")

    def handle_connection(self, client_socket, ip, remote_port, port):
        client_socket.settimeout(200)
        try:
            with self.lock:
                f = open(self.capture_path, 'a')
                f.write(str({"ip": ip, "remote_port": remote_port, "port": port, "timestamp": time.time()}) + "\n")
                f.close()
            data = client_socket.recv(102400)
            with self.lock:
                f = open(self.capture_path, 'a')
                f.write(str({"ip": ip, "remote_port": remote_port, "port": port, "data": data, "timestamp": time.time()})+"\n")
                f.close()
            # TODO: Create a module response file which will contains the responses for each of the requests
            # client_socket.send("Access Denied.\n".encode('utf-8'))
        except Exception as e:
            pass
            #client_socket.send("Connection Timed out.\n".encode('utf-8'))
        finally:
            client_socket.close()

    def start_new_listener_thread(self, port):
        listener = socket()
        listener.bind((self.host, int(port)))
        listener.listen(5)
        while True:
            client, addr = listener.accept()
            client_handler = Thread(target=self.handle_connection, args=(client, addr[0], addr[1], port))
            client_handler.start()
    def start_listening(self):
        for port in self.ports:
            self.logger.info("Listening on %s" %port)
            self.listeners[port] = Thread(self.start_new_listener_thread(port))
            self.listeners[port].start()

    def run(self):
        self.start_listening()