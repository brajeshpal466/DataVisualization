class Armstron
static boolean isArmstrong(int N)
    {
     int temp=N;
     int arm=0;
     while(N>0){
         int r=N%10;
         N=N/10;
        arm+=r*r*r;
     }
     if(temp==arm){
         return true;
     }
     return false;
    }