package com.exam.portal.dev.help;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncryptDecrypt {

	private PasswordEncoder passEncoder;

	public PasswordEncryptDecrypt() {
		this.passEncoder = new BCryptPasswordEncoder();
	}

	public String textEncode(String plainText) {
		return this.passEncoder.encode(plainText);
	}

	public String decodeText(String encodedText) {
		return this.decodeText(encodedText);
	}

	public static void main(String[] args) {
		PasswordEncryptDecrypt bCrptEncryptor = new PasswordEncryptDecrypt();
		final String plainText = "";
		String encodedText = bCrptEncryptor.textEncode(plainText);
		System.out.println(encodedText);

		final String cipherText = "$2a$10$8CmZ808T7XjJ/McYMoksmu.bFmL4gMpl3oU9./H.wxRmrHUFqW9r6";
		String decodedText = bCrptEncryptor.decodeText(cipherText);
		System.out.println(decodedText);

	}

}
