import Button from '@/components/Button';
import Input from '@/components/Input';
import CText from '@/components/Typography';
import { LoginInput, useLogin } from '@/queries/useLogin';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginInput) => {
    mutate(data);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-secondary">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          className="flex-1 px-6">
          <View className="mx-auto w-full max-w-md flex-1 justify-center py-8">
            {/* Header Section */}
            <View className="mb-12">
              <View className="mb-6 h-20 w-20 items-center justify-center rounded-2xl bg-primary-500 shadow-lg">
                <CText variant="Black" className="text-5xl text-text-inverse">
                  TM
                </CText>
              </View>
              <CText variant="Black" className="mb-2 text-4xl text-text-primary">
                Welcome back
              </CText>
              <CText variant="Regular" className="text-lg text-text-secondary">
                Sign in to continue to your tasks
              </CText>
            </View>

            {/* Form Section */}
            <View className="gap-5">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Email Address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    error={errors.password?.message}
                  />
                )}
              />

              {/* <Pressable className="self-end -mt-2">
                <CText variant="Bold" className="text-sm text-primary-500">
                  Forgot password?
                </CText>
              </Pressable> */}

              <Button
                title="Sign In"
                onPress={handleSubmit(onSubmit)}
                isLoading={isPending}
                fullWidth
                className="mt-2"
              />
            </View>

            {/* Footer Section */}
            <View className="mt-8 items-center">
              <View className="flex-row items-center gap-2">
                <CText variant="Regular" className="text-text-secondary">
                  Don't have an account?
                </CText>
                <Pressable onPress={() => router.push('/(auth)/register')}>
                  <CText variant="Bold" className="text-primary-500">
                    Create account
                  </CText>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
