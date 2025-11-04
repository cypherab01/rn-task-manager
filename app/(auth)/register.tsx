import Button from '@/components/Button';
import Input from '@/components/Input';
import CText from '@/components/Typography';
import { RegisterInput, useRegister } from '@/queries/useRegister';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const { mutate, isPending } = useRegister();

  const password = watch('password');

  const onSubmit = (data: RegisterInput) => {
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
          <View className="flex-1 justify-center py-8 mx-auto w-full max-w-md">
            {/* Header Section */}
            <View className="mb-10">
              <View className="justify-center items-center mb-6 w-20 h-20 rounded-2xl shadow-lg bg-primary-500">
                <CText variant="Black" className="text-5xl text-text-inverse">
                  TM
                </CText>
              </View>
              <CText variant="Black" className="mb-2 text-4xl text-text-primary">
                Create account
              </CText>
              <CText variant="Regular" className="text-lg text-text-secondary">
                Sign up to start managing your tasks
              </CText>
            </View>

            {/* Form Section */}
            <View className="gap-5">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Full Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your full name"
                    autoCapitalize="words"
                    autoComplete="name"
                    error={errors.name?.message}
                  />
                )}
              />

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
                    placeholder="Create a password"
                    secureTextEntry
                    autoCapitalize="none"
                    error={errors.password?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    label="Confirm Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Confirm your password"
                    secureTextEntry
                    autoCapitalize="none"
                    error={errors.confirmPassword?.message}
                  />
                )}
              />

              <Button
                title="Create Account"
                onPress={handleSubmit(onSubmit)}
                fullWidth
                className="mt-2"
                isLoading={isPending}
              />
            </View>

            {/* Footer Section */}
            <View className="items-center pb-4 mt-8">
              <View className="flex-row gap-2 items-center">
                <CText variant="Regular" className="text-text-secondary">
                  Already have an account?
                </CText>
                <Pressable onPress={() => router.push('/(auth)/login')}>
                  <CText variant="Bold" className="text-primary-500">
                    Sign in
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

export default RegisterScreen;
