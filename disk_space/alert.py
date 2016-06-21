import json
import smtplib
from email.mime.text import MIMEText


class Alert:
    def __init__(self, from_email, to_email):
        config_file = open("config.json", "r")
        backup_data = json.load(config_file)

        self.username = backup_data["username"]
        self.password = backup_data["password"]
        self.smtp_url = backup_data["smtp_url"]
        self.smtp_port = backup_data["smtp_port"]

        self.from_email = from_email
        self.to_email = to_email

    def send_alert_disk_space(self):
        self.send_email("[DISK SPACE] LOW", "The disk space is down!")

    def send_email(self, subject, text):
        msg = MIMEText(text)
        msg['From'] = self.from_email
        msg['To'] = self.to_email
        msg['Subject'] = subject

        server = smtplib.SMTP(self.smtp_url, self.smtp_port)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(self.username, self.password)

        text = msg.as_string()

        server.sendmail(self.from_email, self.to_email, text)
        server.quit()

if __name__ == '__main__':
    alert = Alert("pgrm.arcf@gmail.com", "pgrm.arcf@gmail.com")
    alert.send_alert_disk_space()
