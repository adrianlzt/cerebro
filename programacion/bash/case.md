case expression in
  pattern1 )
    statements ;;
  pattern2 )
    statements ;;
  ...
  * )
    statements ;;
esac


case $1 in
  "" )
    echo "nada en $1" ;;
  * )
    echo "resto" ;;
esac
